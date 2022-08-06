import {Button, Dialog, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import LoginForm from "../forms/LoginForm";
import {useState} from "react";
import RegisterForm from "../forms/RegisterForm";

const AuthDialog = ({ open, onClose }) => {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={"xs"}>
            <DialogTitle>{ isLogin ? "Login" : "Register" }</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    { isLogin ? <LoginForm/> : <RegisterForm/> }
                    <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography>
                            { isLogin ? "Don't have an account yet?" : "Already have an account?" }
                        </Typography>
                        <Button onClick={ e => setIsLogin(prev => !prev) }>
                            { isLogin ? "Register" : "Login" }
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default AuthDialog