import RenderField from '../RenderField/RenderField';

export default [
    { key: 1, type: "text", label: "First Name", name:"firstName", component:{RenderField} },
    { key: 2, type: "text", label: "Last Name", name:"lastName", component:{RenderField} },
    { key: 3, type: "text", label: "Email", name:"email", component:{RenderField} }
]