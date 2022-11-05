import { IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Tooltip, Typography } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info'
import StarIcon from '@mui/icons-material/Star'
import CommonDialog from "../../../dialogs/CommonDialog"
import { useState } from "react"

const TaskDescriptionButton = () => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Tooltip title={"Task Description"}>
                <IconButton color={"inherit"} size={"large"} onClick={ e => setOpen(true) }>
                    <InfoIcon fontSize={"large"}/>
                </IconButton>
            </Tooltip>
            <CommonDialog
                open={open}
                onClose={ e => setOpen(false) }
                title={"Task Description"}
                maxWidth={"lg"}
            >
                <Typography variant={"h6"} gutterBottom>
                    Курсовой проект
                </Typography>
                <Typography variant={"body2"}>
                    Необходимо реализовать Web-приложения для управления личными коллекциями (книги, марки, виски, и т.д. — в тексте ниже это называется айтемы). 
                    Неаутентифицированные пользователи имеют доступ только в режиме чтения (они могут использовать поиск, но не могут создавать коллекции и айтемы, не могут оставлять комментарии и лайки).
                    Аутентифицированные пользователи не-админы имеют доступ ко всему, за исключением админки.
                    Админка позволяет управлять пользователя — просматривать, блокировать, разблокировать, удалять, добавлять в админы, удалять из админов (АДМИН МОЖЕТ ЗАБРАТЬ У СЕБЯ ПРАВА АДМИНА, это важно).
                    Админ видит все страницы как их автор (например, админ может открыть коллекцию другого пользователя и добавить в нее айтемы; по сути, админ является владельцем всех коллекций и всех айтемов).
                    Только админ или создатель коллекции или айтемов может ими манипулировать (редактировать, добавлять, удалять). Все доступно для просмотра всем (кроме админка).
                    Пользователи могут зарегистрироваться и аутентифицироваться через сайт.
                    Каждая страниц (в хидере сверху) предоставляет доступ по полнотектстовому поиску. Результаты — всегда айтемы (т.е. если текст найден в комментарии, вы показываете ссылку на айтем с комментариями, а не отдельный комментарий). Если результат коллекция, вы можете или показать любой айтем или же сгенерировать ссылку на коллекцию.
                    У каждого юзера есть личная страница, на которой он управляет своими коллекциями (создает, удаляет, редактирует) — каждая коллекция в списке это ссылка на страницу коллекции, которая содержит таблицу айтемов с сортировками и фильтрами и возможностью создать новый айтем, удалить или отредактировать существующий.
                    Каждая коллекция имеет название, описание (с поддержкой форматировать markdown), тему (одно значение из фиксированного справочника, например, “Books”, “Signs”, “Silverware”), опционального изображения (загружается пользователем в облако).
                    Дополнительно коллеуия позволяет указать поля, которые будут у каждого айтема. Плюс у айтемов есть фиксированные поля (id, название, тэги). На уровне коллекции для айтемов можно выбрать любой набор из следующих доступных: 3 целочисленных поля, 3 строковый поля, 3 многострочных текста, 3 логических да/нет чекбокса, 3 поля даты. Для каждого из выбранных полей пользователь задает название.
                    Для примера, пусть я коллекционирую книги. Я могу выбрать (добавить к стандартному набору id, название, тэги) дополнительное строковое поле “Автор”, дополнительный текст “Содержание”, дополнительную дату “Год издания”. Все поля должные рендериться на странице айтема И некоторые из них (строки, даты) в таблице всех айтемов на странице коллекции.
                    Все айтемы должны иметь тэги ( пользователь может ввести несколько тэгов; необходимо поддерживать автодополнние — когда пользователь начинает что-то вводить, ему показывается список из тэгов с соответствующими начальными буквами из тех, что уже есть в базе данных).
                    На главной странице:
                    Список последних добавленных айтемов (имя, коллекция, автор);
                    Список 5 самых больших коллекций;
                    Облако тэгов (когда пользователь кликает на тэг, отображается список айтемов — в общем, лучше всего заюзать страницу результатов поиска).
                    Когда айтем открыт для просмотра (автором или другим пользователем) внизу отображаются комментарии. Комментарии линейные, добавляются всегда только в конец (нельзя откомментить комментарий в середине). Комментарии обновляются автоматически — когда страница открыта и кто-то другой добавил комментарий, он должен появиться автомагически (возможна задержка в 2-5 секунд).
                    Каждый айтем также содежрит лайки (не более одного от одного пользователя на каждый айтем).
                    Сайт должен подддерживать два языка: английский и еще один — польский, узбекский, грузинский, на выбор (пользователь выбирает и выбор сохраняется для пользователя). Сайт должен поддерживать две визуальные темы (skins): светлую и темную (пользователь выбирает и выбор сохраняется).
                    Обязательно:
                    Использовать CSS-фреймворк, например, Bootstrap (но можно любой другой);
                    Поддежривать разные разрешения экрана (в том числе мобилки), адаптивная верстка;
                    Использовать ORM/ODM/... для доступа к данным (sequelize, prism, typeorm, anything you like), 
                    Использовтаь движок полнотекстового поиска (или внешнюю либу или встроенные фичи базы) — нельзя реализовывать поиск через сканирование базы SELECT-ами.
                </Typography>
                <List
                    subheader={
                        <ListSubheader disableSticky>
                            Требования со звездочкой (на “отлично”, 10/10, только если все предыдущие требования реализованы ):
                        </ListSubheader>
                    }
                    dense
                    // disablePadding
                >
                    <ListItem>
                        <ListItemIcon>
                            <StarIcon fontSize={"small"} color={"warning"}/>
                        </ListItemIcon>
                        <ListItemText>
                            аутентификация через социальные сети;
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <StarIcon fontSize={"small"} color={"warning"}/>
                        </ListItemIcon>
                        <ListItemText>
                            добавить кастомные поля с типом “один из заданного списка” с возможностью редактирования списка доступных значений;
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <StarIcon fontSize={"small"} color={"warning"}/>
                        </ListItemIcon>
                        <ListItemText>
                            доабавить произвольное число кастомных полей(не 0 или 1 или 2 или 3 поля данного типа, в произвольное число);
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <StarIcon fontSize={"small"} color={"warning"}/>
                        </ListItemIcon>
                        <ListItemText>
                            добавить экспорт коллекций в CSV-файл;
                        </ListItemText>
                    </ListItem>
                </List>
            </CommonDialog>
        </>
    )
}

export default TaskDescriptionButton