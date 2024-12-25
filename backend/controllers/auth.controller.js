export const signup = async (req, res) => {
  //Sends a JSON response to the client. Here, it sends a JSON object with a data property.
  res.json({
    data: "You hit the signup endpoint",
  });
};

export const login = async (req, res) => {
    //Sends a JSON response to the client. Here, it sends a JSON object with a data property.
    res.json({
      data: "You hit the login endpoint",
    });
  };

  export const logout = async (req, res) => {
    //Sends a JSON response to the client. Here, it sends a JSON object with a data property.
    res.json({
      data: "You hit the logout endpoint",
    });
  };