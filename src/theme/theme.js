import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        rausch: {
         main: '#FF5A5F',
       },
       foggy: {
           main: '#767676'
       },
       hof: {
           main: "#484848"
       },
       white: {
           main: '#fafafa'
       },
 }, 
    components: {
        MuiTextField: {
            styleOverrides: {
                // Name of the slot
                root: {
                "& .MuiInputLabel-root": {color: "#484848"},
                "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "#484848" },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                    borderColor: "#484848"
                }
              }
              },
              },
          },
          MuiInputLabel: {
            styleOverrides: {
            root: {
              color: "#484848",
              shrink: true,
            },
        }
      }
          }
})


/* 
MuiButton: {
  styleOverrides: {
    root: {
        '&:focus': {
            backgroundColor: 'transparent'
        },
        color: "#484848",
        textTransform: 'none',
        letterSpacing: 0.25,
        fontSize: 14
    },
  },
},
*/