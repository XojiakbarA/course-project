import {Drawer, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TopicIcon from '@mui/icons-material/Topic';
import CategoryIcon from '@mui/icons-material/Category';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TagIcon from '@mui/icons-material/Tag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const list = [
    { id: 1, title: "Dashboard", path: "/admin", icon: <DashboardIcon/> },
    { id: 2, title: "Topics", path: "/admin/topics", icon:  <TopicIcon/>},
    { id: 3, title: "Tags", path: "/admin/tags", icon: <TagIcon/> },
    { id: 4, title: "Users", path: "/admin/users", icon: <PeopleIcon/> },
    { id: 5, title: "Collections", path: "/admin/collections", icon: <CategoryIcon/> },
    { id: 6, title: "Items", path: "/admin/items", icon: <AttachFileIcon/> },
    { id: 7, title: "Comments", path: "/admin/comments", icon: <CommentIcon/> }
]

const MainDrawer = ({ open, onClose }) => {

    const location = useLocation()

    return (
        <Drawer
            open={open}
            onClose={onClose}
        >
            <List sx={{ minWidth: 275 }}>
                {
                    list.map(item => (
                        <ListItemButton
                            key={item.id}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={onClose}
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
