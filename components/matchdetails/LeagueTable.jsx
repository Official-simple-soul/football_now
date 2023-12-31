import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { leagueTableData } from "../../data";
import { league_table } from "../../Model/league_table";
import Card from "../constants/Card";
import { colors } from "../constants/colors";
import { Team } from "../constants/Paragraphs";

// Sample data for the league table

const LeagueTable = ({ match_details }) => {
  const [leagueTable, setLeagueTable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await league_table(
        match_details[0]?.league?.season,
        match_details[0]?.league?.id
      );
      setLeagueTable(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Render the header
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>#</Text>
      <View style={{ width: 150 }}>
        <Text style={styles.headerText}>Club</Text>
      </View>
      <Text style={styles.headerText}>PL</Text>
      <Text style={styles.headerText}>W</Text>
      <Text style={styles.headerText}>D</Text>
      <Text style={styles.headerText}>L</Text>
      <Text style={styles.headerText}>GD</Text>
      <Text style={styles.headerText}>P</Text>
    </View>
  );

  // Render each row in the league table
  const renderTeamRow = ({ item, key }) => (
    <View
      style={[
        styles.rowContainer,
        {
          backgroundColor:
            item.team.id === match_details[0]?.teams?.home?.id ||
            item.team.id === match_details[0]?.teams?.away?.id
              ? colors.txtSec
              : "",
        },
      ]}
      key={key}
    >
      <Team team={item.rank} />
      <View style={{ width: 150 }}>
        <Team team={item.team.name} />
      </View>
      <Team team={item.all.played} />
      <Team team={item.all.win} />
      <Team team={item.all.draw} />
      <Team team={item.all.lose} />
      <Team team={item.goalsDiff} />
      <Team team={item.points} color={colors.oth} />
    </View>
  );

  return (
    <ScrollView>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size='large' color={colors.white} />
        </View>
      ) : (
        <Card>
          {renderHeader()}
          <>
            {leagueTable &&
              leagueTable?.[0]?.league?.standings?.[0]?.map((data, id) => {
                return renderTeamRow({ item: data ?? data, key: id }); // Pass data as an object
              })}
          </>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.white,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderLeftWidth: 3,
    borderColor: colors.oth,
    paddingVertical: 7,
    paddingHorizontal: 4,
  },
  rowText: {
    fontSize: 16,
  },
};

export default LeagueTable;
