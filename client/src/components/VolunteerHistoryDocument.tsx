//alina code
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { History } from "../../types";

const VolunteerHistoryDocument = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [historyResponses, setHistoryResponses] = useState<History[]>([]);

    const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
    const base_url =
        env === "production"
            ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL
            : env === "staging"
            ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE
            : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;

    useEffect(() => {
        axios
            .get(`${base_url}/api/volunteers/mongo`)
            .then((response) => setVolunteers(response.data))
            .catch((error) => console.error("Error fetching volunteers:", error));
        axios
            .get(`${base_url}/api/history/mongo`)
            .then((response) => {
                const formattedData = response.data.map((item: any) => ({
                    id: item.id,
                    volunteerId: item.volunteerId,
                    volunteerName: item.volunteerName,
                    eventName: item.eventName,
                    eventDescription: item.eventDescription,
                    location: item.location,
                    skills: item.skills || [],
                    urgency: item.urgency || "Unknown",
                    eventDate: new Date(item.eventDate),
                    status: item.status || [],
                }));
                setHistoryResponses(formattedData);
            })
            .catch((error) => console.error("Error fetching history responses:", error));
    }, []);

    const groupEventsByStatus = (volunteerId: string) => {
        const participated = historyResponses
            .filter((event) => event.volunteerId === volunteerId && event.status.includes("Participated"))
            .map((event) => event.eventName);
        const noShow = historyResponses
            .filter((event) => event.volunteerId === volunteerId && event.status.includes("No show"))
            .map((event) => event.eventName);
        const scheduled = historyResponses
            .filter((event) => event.volunteerId === volunteerId && event.status.includes("Scheduled"))
            .map((event) => event.eventName);

        return { participated, noShow, scheduled };
    };
    const createTableHeader = () => (
        <View style={tableRowStyle} fixed>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>Volunteer Name</Text>
            </View>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>Volunteer ID</Text>
            </View>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>User ID</Text>
            </View>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>Preferences</Text>
            </View>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>Skills</Text>
            </View>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>Participated Events</Text>
            </View>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>No Show Events</Text>
            </View>
            <View style={headerCellStyle}>
                <Text style={headerTextStyle}>Scheduled Events</Text>
            </View>
        </View>
    );

    const renderVolunteerRow = (volunteer: any) => {
        const events = groupEventsByStatus(volunteer._id);
        return (
            <View style={tableRowStyle} key={volunteer._id}>
                <View style={cellStyle}>
                    <Text style={textStyle}>{volunteer.name}</Text>
                </View>
                <View style={cellStyle}>
                    <Text style={textStyle}>{volunteer._id}</Text>
                </View>
                <View style={cellStyle}>
                    <Text style={textStyle}>{volunteer.userId}</Text>
                </View>
                <View style={cellStyle}>
                    <Text style={textStyle}>{volunteer.preferences || "None"}</Text>
                </View>
                <View style={cellStyle}>
                    <Text style={textStyle}>{volunteer.skills.join(", ")}</Text>
                </View>
                <View style={cellStyle}>
                    <Text style={textStyle}>{events.participated.join(", ") || "None"}</Text>
                </View>
                <View style={cellStyle}>
                    <Text style={textStyle}>{events.noShow.join(", ") || "None"}</Text>
                </View>
                <View style={cellStyle}>
                    <Text style={textStyle}>{events.scheduled.join(", ") || "None"}</Text>
                </View>
            </View>
        );
    };

    // Render the document
    return (
        <Document>
            <Page style={pageStyle} size="A4" orientation="portrait">
                <View style={tableStyle}>
                    {createTableHeader()}
                    {volunteers.length > 0 ? (
                        volunteers.map((volunteer) => renderVolunteerRow(volunteer))
                    ) : (
                        <Text>No data available</Text>
                    )}
                </View>
            </Page>
        </Document>
    );
};

const pageStyle: Style = { paddingTop: 16, paddingHorizontal: 40, paddingBottom: 56 };
const tableStyle: Style = { display: "flex", width: "auto" };
const tableRowStyle: Style = { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ddd" };
const headerCellStyle: Style = { flex: 1, backgroundColor: "#f0f0f0", padding: 4, borderWidth: 1, borderColor: "#000" };
const cellStyle: Style = { flex: 1, padding: 4, borderWidth: 1, borderColor: "#000" };
const headerTextStyle: Style = { fontSize: 10, fontWeight: "bold", textAlign: "center" };
const textStyle: Style = { fontSize: 9, textAlign: "center" };

export default VolunteerHistoryDocument;




/*import { Page, Text, View, Document } from "@react-pdf/renderer";
import {Style} from "@react-pdf/types"
import axios from "axios";
import { useEffect, useState } from "react";
import { Volunteer } from "../../types";

const VolunteerHistoryDocument = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>();

  const env = import.meta.env.VITE_REACT_APP_NODE_ENV;
  const base_url = (env == 'production') ?  import.meta.env.VITE_REACT_APP_SERVER_BASE_URL 
  : (env == 'staging') ? import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_STAGE 
  : import.meta.env.VITE_REACT_APP_SERVER_BASE_URL_DEV;

  useEffect(() => {
    axios.get<Volunteer[]>(`${base_url}/api/volunteers/mongo`)
        .then(response => {
            if (response.data) {
                setVolunteers(response.data);
            }
        })
        .catch(error => {
            console.log(error);
        })
      
  }, []);


  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>

        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Volunteer Name</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>VolunteerID</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>UserID</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Preferences</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Skills</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Participated Events</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>No Show Events</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Scheduled Events</Text>
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
            volunteers?.map(volunteer => 
            (  <View style={tableRowStyle}>
                  <View style={firstTableColStyle}>
                    <Text style={tableCellStyle}>{volunteer.name}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellIDStyle}>{volunteer._id}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellIDStyle}>{volunteer.userId}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>{volunteer.preferences?.toString()}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>{volunteer.skills.toString()}</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>Element</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>Element</Text>
                  </View>

                  <View style={tableColStyle}>
                    <Text style={tableCellStyle}>Element</Text>
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

const tableCellStyle: Style = {
  textAlign: "center",
  margin: 3,
  fontSize: 9
};

const tableCellIDStyle: Style = {
  textAlign: "left",
  margin: 0,
  fontSize: 6
};

export default VolunteerHistoryDocument;
*/