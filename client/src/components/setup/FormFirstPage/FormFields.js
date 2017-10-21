import RenderField from '../RenderField/RenderField';

export default [
    { type: "text", label: "First Name", name:"firstName", component:{RenderField} },
    { type: "text", label: "Last Name", name:"lastName", component:{RenderField} },
    { type: "text", label: "Email", name:"email", component:{RenderField} }
]