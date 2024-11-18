import { Page, Text, View, Document } from "@react-pdf/renderer";
import {Style} from "@react-pdf/types"
import axios from "axios";
import { useEffect, useState } from "react";
import { Event, History} from "../../types";


const EventHistoryDocument = () => {
  const [events, setEvents] = useState<Event[]>();
  const [history, setHistories] = useState<History[]>();

  const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
  const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL 
  : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE 
  : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;

  useEffect(() => {
    axios.get<Event[]>(`${base_url}/api/events/mongo`)
        .then(response => {
            if (response.data) {
                setEvents(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        })

      
  }, []);

  const getVolunteersByEvent = (eventId: string) =>{
    axios.get<History[]>(`${base_url}/api/history/mongo`) 
      .then(response => {
        if(response.data){
          setHistories(response.data);
        }
      })
      .catch(error => {
        alert(error);
    });

    const filter_history = history?.filter((history_item) => history_item.eventId == eventId)
    const volunteers = filter_history?.map((history) => history.volunteerName)

    return volunteers
  }
  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>

        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Event Name</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>EventID</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Event Description</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Event Date</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Event Skills</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Event Location</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Event Urgency</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Volunteers</Text>
        </View>
      </View>
    );
  };


  return (
    <Document>
      <Page
        style={pageStyle}
        size="A4"
        orientation="portrait">

        <View style={tableStyle}>
          {createTableHeader()}
          {
            events?.map(event => 
            (  <View style={tableRowStyle}>
                  <View style={firstTableColStyle}>
                    <Text style={tableCellDStyle}>{event.name}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellIDStyle}>{event._id}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellIDStyle}>{event.description}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>{event.dateTime?.toString()}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>{event.skills.toString()}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>{event.location}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellDStyle}>{event.urgency}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>{getVolunteersByEvent(event._id)?.toString()}</Text>
                  </View>
                </View>)

            )
          }
         

        </View>

      </Page>
    </Document>
  );

};

const pageStyle: Style = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56
};

const tableStyle: Style = {
  display: "flex",
  width: "auto"
};

const tableRowStyle: Style = {
  flexDirection: "row"
};

const firstTableColHeaderStyle: Style = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd"
};

const tableColHeaderStyle: Style = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd"
};

const firstTableColStyle: Style = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0
};

const tableColStyle: Style = {
  width: "20%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0
};

const tableCellHeaderStyle: Style = {
  textAlign: "center",
  margin: 2,
  fontSize: 10,
  fontWeight: "bold"
};

const tableCellDStyle: Style = {
  textAlign: "center",
  margin: 3,
  fontSize: 9
};

const tableCellStyle: Style = {
  textAlign: "left",
  margin: 3,
  fontSize: 7
};

const tableCellIDStyle: Style = {
  textAlign: "left",
  margin: 0,
  fontSize: 6
};

export default EventHistoryDocument;