import RenderField from '../../utils/RenderField/RenderField';

export default [
    { key: 1, type: "text", label: "Phone number", name:"phoneNumber", component:{RenderField} },
    { key: 2, type: "radio", label: "Male", name:"gender", component:{RenderField}, value:"male"},
    { key: 3, type: "radio", label: "Female", name:"gender", component:{RenderField}, value:"female"},
    { key: 4, type: "text", label: "Location", name:"location", component:{RenderField} }    
]