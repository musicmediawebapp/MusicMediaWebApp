import RenderField from '../../utils/RenderField/RenderField';

export default [
    { key: 1, type: "text", label: "First Name", name:"firstName", component:{RenderField} },
    { key: 2, type: "text", label: "Last Name", name:"lastName", component:{RenderField} },
    { key: 3, type: "text", label: "Email", name:"email", component:{RenderField} },
    { key: 4, type: "text", label: "Phone number", name:"phoneNumber", component:{RenderField} },
    { key: 5, type: "radio", label: "Male", name:"gender", component:{RenderField}, value:"male"},
    { key: 6, type: "radio", label: "Female", name:"gender", component:{RenderField}, value:"female"},
    { key: 7, type: "text", label: "Location", name:"location", component:{RenderField} }
]