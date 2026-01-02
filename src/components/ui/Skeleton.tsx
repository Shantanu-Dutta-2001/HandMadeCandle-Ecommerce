import classes from '../../styles/components/Skeleton.module.css';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
    style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius, className, style: customStyle }) => {
    const style = {
        width,
        height,
        borderRadius,
        ...customStyle
    };

    return (
        <div
            className={`${classes.skeleton} ${className || ''}`}
            style={style}
        />
    );
};

export default Skeleton;
