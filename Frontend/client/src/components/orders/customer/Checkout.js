import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Box,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Divider,
    Alert,
    CircularProgress,
    Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Review Order', 'Delivery Details', 'Payment Method', 'Confirmation'];

const Checkout = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        deliveryAddress: '',
        paymentMethod: 'cash',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        cardholderName: ''
    });

    const [formErrors, setFormErrors] = useState({
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        cardholderName: ''
    });

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = useCallback(async () => {
        try {
            const sessionId = localStorage.getItem('sessionId');
            if (!sessionId) {
                navigate('/');
                return;
            }
            const response = await fetch(`http://localhost:5001/api/cart/${sessionId}`);
            if (!response.ok) throw new Error('Failed to fetch cart items');
            const data = await response.json();
            setCartItems(data.items || []);
            setLoading(false);
        } catch (err) {
            setError('Failed to load cart items');
            setLoading(false);
        }
    }, [navigate]);

    const validateCardNumber = (number) => {
        // Remove spaces and non-numeric characters
        const cleaned = number.replace(/\s+/g, '');
        if (!/^\d{16}$/.test(cleaned)) {
            return 'Card number must be 16 digits';
        }
        return '';
    };

    const validateExpiryDate = (date) => {
        if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(date)) {
            return 'Invalid format (MM/YY)';
        }
        
        const [month, year] = date.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            return 'Card has expired';
        }
        return '';
    };

    const validateCVV = (cvv) => {
        if (!/^\d{3,4}$/.test(cvv)) {
            return 'CVV must be 3 or 4 digits';
        }
        return '';
    };

    const validateCardholderName = (name) => {
        if (!name.trim()) {
            return 'Cardholder name is required';
        }
        return '';
    };

    const formatCardNumber = (value) => {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, '');
        // Add space after every 4 digits
        return cleaned.replace(/(\d{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (value) => {
        // Remove all non-digit characters
        const cleaned = value.replace(/\D/g, '');
        
        if (cleaned.length >= 2) {
            // Add slash after month
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format input values
        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'cardExpiry') {
            formattedValue = formatExpiryDate(value);
        } else if (name === 'cardCVC') {
            // Only allow 3 digits for CVV
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        // Validate card details
        if (formData.paymentMethod === 'card') {
            let error = '';
            switch (name) {
                case 'cardNumber':
                    error = validateCardNumber(formattedValue);
                    break;
                case 'cardExpiry':
                    error = validateExpiryDate(formattedValue);
                    break;
                case 'cardCVC':
                    error = validateCVV(formattedValue);
                    break;
                case 'cardholderName':
                    error = validateCardholderName(formattedValue);
                    break;
                default:
                    break;
            }
            setFormErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const validateCardForm = () => {
        const errors = {
            cardNumber: validateCardNumber(formData.cardNumber),
            cardExpiry: validateExpiryDate(formData.cardExpiry),
            cardCVC: validateCVV(formData.cardCVC),
            cardholderName: validateCardholderName(formData.cardholderName)
        };
        
        setFormErrors(errors);
        return !Object.values(errors).some(error => error);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
    };

    const handleNext = () => {
        if (activeStep === 1) {
            // Validate delivery details
            if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.deliveryAddress) {
                setError('Please fill in all delivery details');
                return;
            }
        }
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handlePlaceOrder = async () => {
        try {
            setLoading(true);
            const sessionId = localStorage.getItem('sessionId');
            
            // Validate payment details if card payment
            if (formData.paymentMethod === 'card') {
                if (!validateCardForm()) {
                    setError('Please correct the card details');
                    setLoading(false);
                    return;
                }
            }

            const orderData = {
                sessionId,
                customerDetails: {
                    name: formData.customerName,
                    email: formData.customerEmail,
                    phone: formData.customerPhone,
                    address: formData.deliveryAddress
                },
                paymentMethod: formData.paymentMethod
            };

            const response = await fetch('http://localhost:5001/api/orders/customer/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) throw new Error('Failed to place order');

            // Clear cart
            await fetch(`http://localhost:5001/api/cart/${sessionId}`, {
                method: 'DELETE'
            });

            localStorage.removeItem('sessionId');
            handleNext();
        } catch (err) {
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Fade in timeout={500}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            {cartItems.map((item) => (
                                <Card key={item.productId._id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={4}>
                                                <img
                                                    src={item.productId.image.startsWith('http') ? item.productId.image : `http://localhost:5001${item.productId.image}`}
                                                    alt={item.productId.name}
                                                    style={{ width: '100%', maxWidth: '150px', objectFit: 'cover' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant="h6">{item.productId.name}</Typography>
                                                <Typography color="text.secondary">
                                                    Quantity: {item.quantity}
                                                </Typography>
                                                <Typography color="primary">
                                                    LKR {(item.productId.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">Total Amount:</Typography>
                                <Typography variant="h6" color="primary">
                                    LKR {calculateTotal().toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    </Fade>
                );

            case 1:
                return (
                    <Fade in timeout={500}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Delivery Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Full Name"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email"
                                        name="customerEmail"
                                        type="email"
                                        value={formData.customerEmail}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Phone Number"
                                        name="customerPhone"
                                        value={formData.customerPhone}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Delivery Address"
                                        name="deliveryAddress"
                                        multiline
                                        rows={3}
                                        value={formData.deliveryAddress}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                );

            case 2:
                return (
                    <Fade in timeout={500}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Payment Method
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    label="Payment Method"
                                >
                                    <MenuItem value="cash">Cash on Delivery</MenuItem>
                                    <MenuItem value="card">Credit/Debit Card</MenuItem>
                                </Select>
                            </FormControl>

                            {formData.paymentMethod === 'card' && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Cardholder Name"
                                            name="cardholderName"
                                            value={formData.cardholderName}
                                            onChange={handleInputChange}
                                            error={!!formErrors.cardholderName}
                                            helperText={formErrors.cardholderName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Card Number"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            error={!!formErrors.cardNumber}
                                            helperText={formErrors.cardNumber}
                                            placeholder="1234 5678 9012 3456"
                                            inputProps={{ maxLength: 19 }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Expiry Date"
                                            name="cardExpiry"
                                            value={formData.cardExpiry}
                                            onChange={handleInputChange}
                                            error={!!formErrors.cardExpiry}
                                            helperText={formErrors.cardExpiry}
                                            placeholder="MM/YY"
                                            inputProps={{ maxLength: 5 }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="CVC"
                                            name="cardCVC"
                                            value={formData.cardCVC}
                                            onChange={handleInputChange}
                                            error={!!formErrors.cardCVC}
                                            helperText={formErrors.cardCVC}
                                            placeholder="123"
                                            inputProps={{ maxLength: 3 }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    </Fade>
                );

            case 3:
                return (
                    <Fade in timeout={500}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" gutterBottom color="success.main">
                                Order Placed Successfully!
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Thank you for your order. We will send you an email confirmation shortly.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/orders')}
                            >
                                View Order History
                            </Button>
                        </Box>
                    </Fade>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {renderStepContent(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                        disabled={activeStep === steps.length - 1}
                    >
                        {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Checkout; 