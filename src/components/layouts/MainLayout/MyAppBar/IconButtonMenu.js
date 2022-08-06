import {IconButton, Stack, Tooltip} from "@mui/material";

const IconButtonMenu = ({ menu }) => {

    return (
        <Stack direction={"row"} alignItems={"center"} display={{ xs: "none", md: "flex" }}>
            {
                menu.map(item => (
                    <Tooltip key={item.id} title={item.title}>
                        <IconButton
                            aria-describedby={item.id}
                            color="inherit"
                            size={item.size}
                            onClick={item.onClick}
                        >
                            { item.icon }
                        </IconButton>
                    </Tooltip>
                ))
            }
        </Stack>
    )
}

export default IconButtonMenu