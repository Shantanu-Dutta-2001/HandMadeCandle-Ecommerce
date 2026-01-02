import { useAuth } from '../../context/AuthContext';
import classes from '../../styles/components/Dashboard.module.css';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className={classes.content}>
            <h2>My Profile</h2>
            <div className={classes.profileCard}>
                <div className={classes.formGroup}>
                    <label>Name</label>
                    <div className={classes.value}>{user?.name}</div>
                </div>
                <div className={classes.formGroup}>
                    <label>Email</label>
                    <div className={classes.value}>{user?.email}</div>
                </div>
                <div className={classes.formGroup}>
                    <label>Member ID</label>
                    <div className={classes.value}>{user?.id}</div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
