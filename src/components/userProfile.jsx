import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import NavBar from "./navbar";
import UserAuthentication from "./userAuthentication";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const GetProfileResponse = ({ handleUserLogin, authentication }) => {
  const [profile, setProfile] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [authCurrentUser, setAuthCurrentUser] = useState(null);

  const handleDateClick = (index) => {
    setSelectedDate(selectedDate === index ? null : index);
  };

  const handleItemClick = (index) => {
    setSelectedItem(selectedItem === index ? null : index);
  };

  //Filters.jsx - User Authentication Observer
  //The observer tracks the user authentication token across the different components

  console.log("Auth Current User is: " + authCurrentUser);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthCurrentUser(user);
        console.log("User is: " + user);
        handleUserLogin(user); // Call the handler to update user state in parent component
        axios
          .get(
            `https://giftfairy-be-server.onrender.com/api/filter/response/${user.email}/`
          )
          .then((response) => {
            const items = response.data;
            setProfile(items);
          });
      } else {
        // No user is signed in
        setAuthCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the observer
  }, []);

  console.log(authCurrentUser);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 40 1440 290">
        <path
          fill="#ffa517"
          fill-opacity=".75"
          d="M0,160L40,176C80,192,160,224,240,234.7C320,245,400,235,480,197.3C560,160,640,96,720,96C800,96,880,160,960,165.3C1040,171,1120,117,1200,85.3C1280,53,1360,43,1400,37.3L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <div className="navbar-ProgressBar-Container" style={{ height: "81px" }}>
        <NavBar />
      </div>
      <div className="userProfileContainer">
        <h1>User Profile</h1>

        {!authCurrentUser && (
          <>
            <UserAuthentication
              handleUserLogin={handleUserLogin}
              authentication={authentication}
            />
          </>
        )}

        {authCurrentUser && (
          <>
            <h2>Selection History</h2>
            <div className="userProfileHistory">
              {profile
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((item, index) => (
                  <div key={index} className="userHistoryByDate">
                    <div key={index} className="userHistoryByDateHeader">
                      <h3>Recipient: {item.giftee_name}</h3>
                      {selectedDate == index ? (
                        <svg
                          id="more-arrows"
                          viewBox="0 0 125 115"
                          onClick={() => handleDateClick(index)}
                        >
                          <polygon
                            className="arrow-top"
                            points="37.6,1.3 1.8,27.9 3.3,29.2 37.6,3.9 71.9,29.2 73.7,27.9"
                          />
                          <polygon
                            className="arrow-middle"
                            points="37.6,18.7 0.8,45.8 4.4,48.1 37.6,23.2 71.2,48.1 74.5,45.8"
                          />
                          <polygon
                            className="arrow-bottom"
                            points="37.6,36.1 0,64 5.1,67.3 37.6,43.2 70.4,67.3 75.5,64"
                          />
                        </svg>
                      ) : (
                        <svg
                          id="more-arrows"
                          viewBox="0 0 125 115"
                          onClick={() => handleDateClick(index)}
                        >
                          <polygon
                            className="arrow-top"
                            points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "
                          />
                          <polygon
                            className="arrow-middle"
                            points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "
                          />
                          <polygon
                            className="arrow-bottom"
                            points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "
                          />
                        </svg>
                      )}
                    </div>
                    {selectedDate == index && (
                      <div className="userHistory">
                        <h3>
                          Date:{" "}
                          {dayjs(item.created_at).format("MM-DD-YY hh:mm A")}
                        </h3>
                        <div className="userHistorySelections">
                          <h3>Selections:</h3>
                          {selectedItem == index ? (
                            <svg
                              id="more-arrows"
                              viewBox="0 0 125 115"
                              onClick={() => handleItemClick(index)}
                            >
                              <polygon
                                className="arrow-top"
                                points="37.6,1.3 1.8,27.9 3.3,29.2 37.6,3.9 71.9,29.2 73.7,27.9"
                              />
                              <polygon
                                className="arrow-middle"
                                points="37.6,18.7 0.8,45.8 4.4,48.1 37.6,23.2 71.2,48.1 74.5,45.8"
                              />
                              <polygon
                                className="arrow-bottom"
                                points="37.6,36.1 0,64 5.1,67.3 37.6,43.2 70.4,67.3 75.5,64"
                              />
                            </svg>
                          ) : (
                            <svg
                              id="more-arrows"
                              viewBox="0 0 125 115"
                              onClick={() => handleItemClick(index)}
                            >
                              <polygon
                                className="arrow-top"
                                points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "
                              />
                              <polygon
                                className="arrow-middle"
                                points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "
                              />
                              <polygon
                                className="arrow-bottom"
                                points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "
                              />
                            </svg>
                          )}
                        </div>
                        {selectedItem === index && (
                          <div className="details">
                            <h3>Age: {item.age}</h3>
                            <h3>Gender: {item.gender}</h3>
                            <h3>Relationship: {item.relationship}</h3>
                            <h3>Price Range: {item.price_range}</h3>
                            <h3>Occasion: {item.occasion}</h3>
                            <h3>Gift Type: {item.gift_type}</h3>
                            <h3>Interest: {item.interest}</h3>
                            <h3>Activity: {item.activity_level}</h3>
                            <h3>Personality: {item.personality}</h3>
                            <h3>Nature: {item.nature}</h3>
                          </div>
                        )}
                        <div className="userHistoryGeneratedGifts">
                          <h3>
                            Generated Gift Ideas: {item.item_title_string}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
        {authCurrentUser && (
          <>
            <UserAuthentication
              handleUserLogin={handleUserLogin}
              authentication={authentication}
            />
          </>
        )}
      </div>
    </>
  );
};

export default GetProfileResponse;
