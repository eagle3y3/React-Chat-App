import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CTX } from './store';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
  },

  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey',
  },

  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px'
  },

  chatBox: {
    width: '85%'
  },

  button: {
    width: '15%',
    paddingLeft: '5px'
  }
}));


export default function Dashboard(){

  const classes = useStyles();

  //CTX store
  const {allChats, sendChatAction, user} = React.useContext(CTX)

  const topics = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState('');

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h3">
          Chat App
        </Typography>
        <Typography component="h5">
          { activeTopic }
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {
                topics.map(topic => (
                    <ListItem onClick={ e => changeActiveTopic(e.target.innerText)} key={topic} button>
                      <ListItemText primary={topic} />
                    </ListItem>
                ))
              }
            </List>
          </div>
          <div className={classes.chatWindow}>
            {
              allChats[activeTopic].map((chat, i) => (
                  <div className={classes.flex} key={i}>
                    <Chip label={chat.from} className={classes.chip} />
                    <Typography variant='body1'>{chat.msg}</Typography>
                  </div>
              ))
            }
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            id="outlined-multiline-static"
            label="Enter Message"
            rows="1"
            value={textValue}
            onChange={ e => {
              e.preventDefault()
              changeTextValue(e.target.value)
            }}
            className={classes.chatBox}
            margin="normal"
            variant="outlined"
          />
          <Button variant="outlined"
           color="primary"
           onClick={() => {
             sendChatAction({from: user , msg: textValue, topic: activeTopic });
             changeTextValue('');
           }}
           className={classes.button}>
            Send
          </Button>
        </div>
      </Paper>
    </div>
  )
}
