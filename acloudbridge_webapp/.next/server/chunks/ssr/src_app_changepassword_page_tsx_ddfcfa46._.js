module.exports = {

"[project]/src/app/changepassword/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// ... (imports)
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
"use client";
const ChangePasswordPage = ()=>{
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to change your password.');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmNewPassword
                })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again.');
        }
    };
// ... (rest of your component, including form)
};
const __TURBOPACK__default__export__ = ChangePasswordPage;
}}),

};

//# sourceMappingURL=src_app_changepassword_page_tsx_ddfcfa46._.js.map