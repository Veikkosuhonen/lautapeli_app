import { Menu } from '@headlessui/react'

const OptionsDropDown = ({
    button, children
}) => {

    return (
        <div>
            <Menu>
                <Menu.Button>{button}</Menu.Button>
                <Menu.Items className="relative mt-2 shadow-md p-2 bg-slate-800 rounded-md">
                    <Menu.Item>{children}</Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default OptionsDropDown