import React, { useState } from 'react';
import type { Address } from '../types';
import classes from '../styles/components/AddressForm.module.css';

interface AddressFormProps {
    onSubmit: (address: Address) => Promise<void>;
    onCancel: () => void;
    initialData?: Address;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState<Address>(initialData || {
        name: '',
        addressLine: '',
        city: '',
        zip: '',
        phone: '',
        isDefault: false
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Failed to save address', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h3>{initialData ? 'Edit Address' : 'Add New Address'}</h3>
            <div className={classes.formGroup}>
                <label>Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                />
            </div>
            <div className={classes.formGroup}>
                <label>Address Line</label>
                <input
                    type="text"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                    required
                    placeholder="123 Main St, Apt 4B"
                />
            </div>
            <div className={classes.row}>
                <div className={classes.formGroup}>
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="New York"
                    />
                </div>
                <div className={classes.formGroup}>
                    <label>ZIP Code</label>
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        placeholder="10001"
                    />
                </div>
            </div>
            <div className={classes.formGroup}>
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 234 567 8900"
                />
            </div>
            <div className={classes.checkboxGroup}>
                <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    id="isDefault"
                />
                <label htmlFor="isDefault">Set as default address</label>
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={onCancel} className={classes.btnSecondary} disabled={loading}>
                    Cancel
                </button>
                <button type="submit" className={classes.btnPrimary} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Address'}
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
