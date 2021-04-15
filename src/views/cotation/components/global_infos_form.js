import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from 'src/views/theme/typography/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import Delete from '@material-ui/icons/Delete';

// Handling
// Inflight
// Crew

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        minWidth: 180,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
const create_leg = (index) => {
    return {
        depart: "",
        arrivee: "",
        index: index,
    }
}

var global_legs = [create_leg()]

export default function GlobalInfosForm(props) {
    const classes = useStyles();

    const [legs, setLegsState] = React.useState(global_legs);

    const addLeg = () => {
        setLegsState(prev => {
            // global_legs = [...global_legs, create_leg(prev.length)]
            global_legs.push(create_leg(prev.length));
            return [...global_legs];
        });
    }

    // const delete_leg = (index) => {
    //     console.log("deleted", global_legs.splice(index, 1), "at index", index);
    //     setLegsState([...global_legs]);
    // }
    const delete_leg = () => {
        global_legs.pop();
        setLegsState([...global_legs]);
    }
    React.useEffect(() => {
        console.log("The component MOUNT");

        return () => {
            // console.log(legs)
            // get_legs();
            props.aggregate_legs(global_legs);
            console.log("The component Unmout");
        }
    }, [])
    return (
        <div>
            <form className={classes.container} noValidate>
                <Grid container className={classes.margin}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={6} sm={6}>
                                <Grid item container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Prénom" />
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <AccountCircle />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="input-with-icon-grid" label="Nom" />
                                    </Grid>
                                </Grid>
                                <div className={classes.container}>
                                    <TextField
                                        id="date"
                                        label="Date de naissance"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Avion</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        // value={"Ten"}
                                        onChange={(event) => console.log(event.target.value)}
                                        label="Avion"
                                    >
                                        <MenuItem value={10}>Bombardier</MenuItem>
                                        <MenuItem value={20}>Air Force One</MenuItem>
                                        <MenuItem value={30}>Air Fly</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item container xs={6} sm={6}>
                                <Typography >Veuillez entrer les legs</Typography>
                                <Grid container item sm={12}>
                                    {legs.map((element, index) => <Leg index={index} key={index} delete={delete_leg} infos_leg={element} />)}
                                </Grid>
                                <center>
                                    <Button variant="contained"
                                        style={{ margin: 6 }}
                                        color="default"
                                        className={classes.button}
                                        startIcon={<Send />} onClick={(event) => addLeg()}>AJOUTER
                                    </Button>
                                    <span>
                                        <IconButton aria-label="expand row" size="small" color="secondary" onClick={() => delete_leg()}>
                                            <Delete />
                                        </IconButton>
                                    </span>
                                </center>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

        </div>
    );
}

const legsStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));
function Leg(props) {
    const classes = legsStyles();
    // console.log(props.index)
    return (
        <div className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="standard-password-input"
                    label="Départ"
                    autoComplete="current-password"
                    helperText="Aéroport de départ."
                    defaultValue={props.infos_leg.index}

                />
                <TextField
                    id="standard-password-input"
                    label="Arrivée"
                    autoComplete="current-password"
                    helperText="Aéroport d'arrivée."
                />
                {/* <span>
                    <IconButton aria-label="expand row" size="small" onClick={() => props.delete(props.index)}>
                        <Delete />
                    </IconButton>
                </span> */}
            </div>
        </div>
    )
}