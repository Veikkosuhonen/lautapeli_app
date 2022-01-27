import { useField } from "formik";
import { usePopperTooltip } from "react-popper-tooltip"
import 'react-popper-tooltip/dist/styles.css';

const FormikTextArea = ({
    label, ...props
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
        visible: meta.touched && meta.error,
    });

    let className = "p-1 text-slate-300 w-full rounded bg-slate-700/50 outline-2 "
    + "focus:outline-none focus:outline-indigo-400 hover:outline-dashed hover:outline-indigo-600 outline-offset-2 "
    if (meta.touched && meta.error) {
        className += "outline outline-rose-500 focus:outline-rose-500 "
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