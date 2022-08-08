import {Button, Drawer, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TopicIcon from '@mui/icons-material/Topic';
import CategoryIcon from '@mui/icons-material/Category';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const list = [
    { id: 1, title: "Users", path: "/admin/users", icon: <PeopleIcon/> },
    { id: 2, title: "Topics", path: "/admin/topics", icon:  <TopicIcon/>},
    { id: 3, title: "Collections", path: "/admin/collections", icon: <CategoryIcon/> },
    { id: 4, title: "Items", path: "/admin/items", icon: <AttachFileIcon/> },
    { id: 5, title: "Tags", path: "/admin/tags", icon: <TagIcon/> }
]

const MainDrawer = ({ open, onClose }) => {

    const location = useLocation()

    return (
        <Drawer
            open={open}
            onClose={onClose}
        >
            <Button
                sx={{ my: 2 }}
                size={"large"}
                startIcon={<DashboardIcon/>}
                component={Link}
                to={"/admin"}
                variant={location.pathname === "/admin" ? "outlined" : "text"}
            >
                Dashboard
            </Button>
            <List sx={{ minWidth: 275 }}>
                {
                    list.map(item => (
                        <ListItemButton
                            key={item.id}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                        >
                            <ListItemIcon>{ item.icon }</ListItemIcon>
                            <ListItemText>{ item.title }</ListItemText>
                        </ListItemButton>
                    ))
                }
            </List>
        </Drawer>
    );
}

export default MainDrawer
