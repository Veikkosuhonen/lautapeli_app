import { useField } from "formik";
import { usePopperTooltip } from "react-popper-tooltip"
import 'react-popper-tooltip/dist/styles.css';
import styles from "../../util/styles";

const FormikTextArea = ({
    label, errorMessage, ...props
}) => {
    const [field, meta] = useField(props)

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        trigger: null,
        placement: "bottom",
        closeOnOutsideClick: false,
        visible: meta.touched && meta.error && errorMessage,
    });

    let className = styles.inputField
    if (meta.touched && meta.error && errorMessage) {
        className += styles.inputFieldError
    }
    className += props.className

    return (
        <>
            <textarea 
                ref={setTriggerRef}
                className={className}
                {...field} {...props}
            />
            { visible && (
                <div
                ref={setTooltipRef}
                {...getTooltipProps({ className: 'tooltip-container' })}>
                    {meta.error}
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    )
}

export default FormikTextArea