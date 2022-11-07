import React, { useEffect, useState } from "react";
import Head from "next/head";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
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
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Info from "components/Typography/Info.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Button from '@material-ui/core/Button';


import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

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

  // const [tempData, setTempData] = useState({ labels: [], series: [[]] });
  let chartData = {};
  const getWeatherData = async () => {
    const res = await axios.get("https://api.thingspeak.com/channels/1921422/feeds.json?api_key=Q1XO4TCIWK8VBE5I&results=7");

    setWeatherData(res.data.feeds[res.data.feeds.length - 1]);
    // console.log(res.data);
    // res.data.feeds.forEach(element => {
    //   // arr.push(element.field1);
    //   setTempData({ labels: tempData.labels.push(element.created_at), series: tempData.series[0].push(element.field1) })
    // });

    // setTempData({series:[arr]})

    // console.log(tempData)
    // chartData = tempData;
    // console.log(chartData)
  }

  useEffect(() => {
    // const intervalCall = setInterval(() => {
    getWeatherData();
    // }, 30000);
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard | Weather Monitoring</title>
      </Head>
      <div>
        <div style={{ textAlign: "end" }}>
          <a href="https://thingspeak.com/channels/1921422/private_show" target="_blank">
            <Button variant="contained" color="primary">
              Data Visualization
            </Button>
          </a>
        </div>
        {/* <div >
          <FormControlLabel
            control={
              <Switch
                checked={liveStatus}
                onChange={handleLiveStatus}
                name="checkedB"
                color="primary"
              />
            }
            label="Live Status"
          />
        </div> */}
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
                <h3 className={classes.cardTitle}>{weatherData.field3} <small>AQI</small></h3>
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
                {/* {Number(weatherData.field3) <= 180 && <div className={classes.stats}>
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
                </div>} */}
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
                {/* {Number(weatherData.field3) <= 180 && <div className={classes.stats}>
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
                </div>} */}
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
                <h3 className={classes.cardTitle}>{weatherData.field6} <span>%</span></h3>
              </CardHeader>
              <CardFooter stats>
                {Number(weatherData.field6) <= 180 && <div className={classes.stats}>
                  <InfoIcon />
                  Normal
                </div>}
                {(Number(weatherData.field6) > 180 && Number(weatherData.field6) <= 300) && <div className={classes.stats}>
                  <InfoIcon />
                  Normal
                </div>}
                {Number(weatherData.field6) > 300 && <div className={classes.stats}>
                  <InfoIcon />
                  Normal
                </div>}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>Last Campaign Performance</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="dark">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>Last Campaign Performance</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer> */}

        {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
      </div>
    </>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
