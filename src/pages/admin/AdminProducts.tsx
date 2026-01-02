import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Product } from '../../types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '', description: '', price: 0, category: '', image: '', rating: 5
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Failed", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/admin/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.put(`/admin/products/${editingProduct.id}`, formData);
            } else {
                await api.post('/admin/products', formData);
            }
            setShowModal(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    const openEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData(product);
        setShowModal(true);
    };

    const openAdd = () => {
        setEditingProduct(null);
        setFormData({ name: '', description: '', price: 0, category: '', image: 'https://via.placeholder.com/300', rating: 5 });
        setShowModal(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h1>Manage Products</h1>
                <button className="btn btn-primary" onClick={openAdd}>
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Product
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {products.map(product => (
                    <div key={product.id} style={{
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        background: 'var(--bg-secondary)'
                    }}>
                        <div style={{ height: '200px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {product.image ? (
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>${product.price.toFixed(2)}</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{product.category}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem' }} onClick={() => openEdit(product)}>
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button className="btn btn-outline" style={{ padding: '0.5rem', borderColor: 'var(--color-error)', color: 'var(--color-error)' }} onClick={() => handleDelete(product.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--bg-primary)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-md)',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Name</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', border: '1px solid var(--border-subtle)', borderRadius: '4px' }} />
                                </div>
                                <div>
                                    <label>Price</label>
                                    <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', border: '1px solid var(--border-subtle)', borderRadius: '4px' }} />
                                </div>
                            </div>

                            <div>
                                <label>Category</label>
                                <input required type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', border: '1px solid var(--border-subtle)', borderRadius: '4px' }} />
                            </div>

                            <div>
                                <label>Description</label>
                                <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', border: '1px solid var(--border-subtle)', borderRadius: '4px' }} />
                            </div>

                            <div>
                                <label>Image URL</label>
                                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', border: '1px solid var(--border-subtle)', borderRadius: '4px' }} />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                {editingProduct ? 'Update Product' : 'Create Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
