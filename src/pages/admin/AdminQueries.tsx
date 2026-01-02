import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Message } from '../../types';
import { Mail, Send, MessageSquare } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';

const AdminQueries = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
    const [replyBody, setReplyBody] = useState('');
    const [loading, setLoading] = useState(true);
    const [sendingId, setSendingId] = useState<number | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/admin/messages');
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (msgId: number) => {
        if (!replyBody.trim() || replyBody === '<br>') return;

        setSendingId(msgId);
        try {
            await api.post(`/admin/messages/${msgId}/reply`, JSON.stringify(replyBody), {
                headers: { 'Content-Type': 'application/json' }
            });
            alert('Reply sent successfully!');
            setActiveReplyId(null);
            setReplyBody('');
            // Optionally refresh messages or mark as replied
            fetchMessages();
        } catch (error) {
            console.error("Failed to send reply", error);
            alert('Failed to send reply.');
        } finally {
            setSendingId(null);
        }
    };

    if (loading) return <div>Loading queries...</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>User Queries</h1>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        padding: '1.5rem',
                        background: 'white',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{msg.subject}</h3>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {new Date(msg.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <Mail size={14} /> {msg.name} ({msg.email})
                        </div>
                        <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                            {msg.body}
                        </p>

                        {/* Reply Section */}
                        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                            {activeReplyId === msg.id ? (
                                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--color-accent)' }}>Compose Reply</h4>
                                    <RichTextEditor
                                        value={replyBody}
                                        onChange={setReplyBody}
                                        placeholder="Write your professional response here..."
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => { setActiveReplyId(null); setReplyBody(''); }}
                                            disabled={sendingId === msg.id}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleReply(msg.id)}
                                            disabled={!replyBody.trim() || sendingId === msg.id}
                                        >
                                            {sendingId === msg.id ? 'Sending...' : (
                                                <><Send size={16} style={{ marginRight: '0.5rem' }} /> Send Reply</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setActiveReplyId(msg.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'none',
                                        border: '1px solid var(--color-accent)',
                                        color: 'var(--color-accent)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: 500,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <MessageSquare size={16} /> Reply to Query
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {messages.length === 0 && <p>No queries found.</p>}
            </div>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </div>
    );
};

export default AdminQueries;
