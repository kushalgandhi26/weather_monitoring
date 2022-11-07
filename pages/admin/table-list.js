import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Head from "next/head";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function TableList() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState([])

  const getWeatherData = async () => {
    const res = await axios.get("https://api.thingspeak.com/channels/1921422/feeds.json?api_key=Q1XO4TCIWK8VBE5I");
    setWeatherData(res.data.feeds);
  }

  useEffect(() => {
    getWeatherData();
  }, [])


  return (
    <>
      <Head>
        <title>History | Weather Monitoring</title>
      </Head>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Previous Readinngs</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a history for all monitoring fields
              </p>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date (MM/DD/YYYY)</TableCell>
                      <TableCell align="right">Temperature (°C)</TableCell>
                      <TableCell align="right">Humidity (%)</TableCell>
                      <TableCell align="right">Air Quality (AQI)</TableCell>
                      <TableCell align="right">Pressure (Pa)</TableCell>
                      <TableCell align="right">Altitude (m)</TableCell>
                      <TableCell align="right">Light Intensity (%)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {weatherData.slice().reverse().map(row => (
                      <TableRow key={row.entry_id}>
                        <TableCell align="left">{new Date(row.created_at).toLocaleString(undefined, { timeZone: "Asia/Kolkata" })}</TableCell>
                        <TableCell align="right">{row.field1}</TableCell>
                        <TableCell align="right">{row.field2}</TableCell>
                        <TableCell align="right">{row.field3}</TableCell>
                        <TableCell align="right">{row.field4}</TableCell>
                        <TableCell align="right">{row.field5}</TableCell>
                        <TableCell align="right">{row.field6}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park",
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten",
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
      </GridContainer>
    </>
  );
}

TableList.layout = Admin;

export default TableList;
