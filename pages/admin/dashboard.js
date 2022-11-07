import React, { useEffect, useState } from "react";
import Head from "next/head";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import CloudIcon from '@material-ui/icons/Cloud';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import WavesIcon from '@material-ui/icons/Waves';
import EcoIcon from '@material-ui/icons/Eco';
import HeightIcon from '@material-ui/icons/Height';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import InfoIcon from '@material-ui/icons/Info';
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from '@material-ui/core/Button';

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import axios from "axios";



function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState({});
  const [liveStatus, setLiveStatus] = useState(false);

  const handleLiveStatus = () => {
    setLiveStatus(!liveStatus);
  }

  let chartData = {};
  const getWeatherData = async () => {
    const res = await axios.get("https://api.thingspeak.com/channels/1921422/feeds.json?api_key=Q1XO4TCIWK8VBE5I&results=7");

    setWeatherData(res.data.feeds[res.data.feeds.length - 1]);
  }

  useEffect(() => {
    getWeatherData();
    const intervalCall = setInterval(() => {
      getWeatherData();
    }, 30000);
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard | Weather Monitoring</title>
      </Head>
      <div>
        <div style={{ textAlign: "end" }}>
          <a href="https://thingspeak.com/channels/1921422" target="_blank">
            <Button variant="contained" color="primary">
              Data Visualization
            </Button>
          </a>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <CloudIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Temperature</p>
                <h3 className={classes.cardTitle}>
                  {weatherData.field1} <small>°C</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                {Number(weatherData.field1) <= 13 && <div className={classes.stats}>
                  <InfoIcon />
                  Cool
                </div>}
                {(Number(weatherData.field1) > 21 && Number(weatherData.field1) <= 29) && <div className={classes.stats}>
                  <InfoIcon />
                  Warm
                </div>}
                {Number(weatherData.field1) > 29 && <div className={classes.stats}>
                  <InfoIcon />
                  Hot
                </div>}
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="dark" stats icon>
                <CardIcon color="success">
                  <EcoIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Humidity</p>
                <h3 className={classes.cardTitle}>{weatherData.field2} <small>%</small></h3>
              </CardHeader>
              <CardFooter stats>
                {Number(weatherData.field2) <= 20 && <div className={classes.stats}>
                  <InfoIcon />
                  Normal
                </div>}
                {(Number(weatherData.field2) > 20 && Number(weatherData.field2) <= 50) && <div className={classes.stats}>
                  <InfoIcon />
                  Humid
                </div>}
                {Number(weatherData.field2) > 50 && <div className={classes.stats}>
                  <InfoIcon />
                  Very Humid
                </div>}
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <WavesIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Air Quality</p>
                <h3 className={classes.cardTitle}>{weatherData.field3} <small>PPM</small></h3>
              </CardHeader>
              <CardFooter stats>
                {Number(weatherData.field3) <= 180 && <div className={classes.stats}>
                  <InfoIcon />
                  Good!
                </div>}
                {(Number(weatherData.field3) > 180 && Number(weatherData.field3) <= 300) && <div className={classes.stats}>
                  <InfoIcon />
                  Poor
                </div>}
                {Number(weatherData.field3) > 300 && <div className={classes.stats}>
                  <InfoIcon />
                  Very bad
                </div>}
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="dark">
                  <PlayForWorkIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Pressure</p>
                <h3 className={classes.cardTitle}>{weatherData.field4} <small>Pa</small></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <InfoIcon />
                  Normal
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <HeightIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Altitude</p>
                <h3 className={classes.cardTitle}>{weatherData.field5} <small>m</small></h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <InfoIcon />
                  Normal
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="primary">
                  <WbSunnyIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Light Intensity</p>
                <h3 className={classes.cardTitle}>{Math.floor(Number(weatherData.field6))} <span>lux</span></h3>
              </CardHeader>
              <CardFooter stats>
                {Number(weatherData.field6) <= 500 && <div className={classes.stats}>
                  <InfoIcon />
                  Dark/Night
                </div>}
                {(Number(weatherData.field6) > 501 && Number(weatherData.field6) <= 5380) && <div className={classes.stats}>
                  <InfoIcon />
                  Low Light
                </div>}
                {(Number(weatherData.field6) > 5381 && Number(weatherData.field6) <= 21520) && <div className={classes.stats}>
                  <InfoIcon />
                  Overcast/Shade
                </div>}
                {(Number(weatherData.field6) > 21521 && Number(weatherData.field6) <= 43050) && <div className={classes.stats}>
                  <InfoIcon />
                  Daylight
                </div>}
                {(Number(weatherData.field6) > 43051) && <div className={classes.stats}>
                  <InfoIcon />
                  Direct Sun
                </div>}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
