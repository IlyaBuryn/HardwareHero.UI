import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Avatar, Box, CircularProgress, Container, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon, Done as DoneIcon, Cancel as CancelIcon, Chat as ChatIcon } from '@mui/icons-material';
import { useUserManager } from '../../../services/userManager';
import { useContributorManager } from '../../../services/contributorManager';
import SortIcon from '@mui/icons-material/Sort';
import FaceIcon from '@mui/icons-material/Face';
import { ContributorInfoDialog } from '../../Common/Dialog/UserInfoDialogs';

const baseImageUrl = 'http://localhost/images/';


function DropdownMenu({ contributorName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const contributorManager = useContributorManager();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const errorHandler = (str) => {
    localStorage.setItem('errorMessage', str)
  }

  const handleConfirm = async () => {
    const contributor = await contributorManager.getContributorByName(contributorName ?? " ");
    var response = await contributorManager.acceptContributorRequest(contributor)
    console.log("response: ", response);
  }

  const handleDenied = () => {
    
  }

  const handleChat = () => {

  }

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleConfirm}>
          <IconButton size="small">
            <DoneIcon />
          </IconButton>
          Подтвердить заявку
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton size="small">
            <CancelIcon />
          </IconButton>
          Отклонить заявку
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton size="small">
            <ChatIcon />
          </IconButton>
          Открыть чат
        </MenuItem>
      </Menu>
    </>
  );
};




export default function ContributorRequests() {
  const navigate = useNavigate();
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState('');

  const [showContributorInfo, setShowContributorInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [data, setData] = useState([]);
  const userManager = useUserManager();

  useEffect(() => {
    async function tryGetContributors() {
      setIsLoadingScreen(true)
        
        var contributors = await contributorManager.getAllContributors();
        if (contributors !== null) {
          
          setData(contributors);
        }
        else {
          localStorage.setItem('errorMessage', 'Ничего не найдено!')
        }
      setIsLoadingScreen(false)
    };

    tryGetContributors();
  }, []) // !


  const handleSort = (column) => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setSortedColumn(column);
  };

  const sortedData = data.sort((a, b) => {
    if (sortedColumn === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }

    return 0;
  });


  const theme = createTheme({
    palette: {
      confirmed: {
        main: '#82C0CC', // isConfirmed == true
        secondary: '#BC2C1A', // isConfirmed == false
        new: '#EDE7E3' // new
      },
    },
  });

  const showStatus = (value) => {
    if (value === null) {
      return 'NULL'
    }
    else if (value === true) {
      return 'Confirmed'
    }
    else {
      return 'Denied'
    }
  }

  const errorHandler = (str) => {
    localStorage.setItem('errorMessage', str);
  }
  
  const handleContributorInfoClick = async (item) => {
    console.log(item)
    var user = await userManager.getUserById(item.id, errorHandler);
    console.log('user', user)
    if (user !== null) {
      const updatedUser = { ...user, ...item };
      setUserInfo(updatedUser);
      setShowContributorInfo(true);
    }
    else {
      await errorHandler('Нет информации об этом пользователе!');
    }
  };

  const handleContributorInfoClose = () => {
    setShowContributorInfo(false);
    setUserInfo(null);
  };

  useEffect(() => {
    setIsLoadingScreen(true)
    if (userManager.isUserHasRole('Manager') === false) {
      navigate('/home');
    }
    else {
      setIsLoadingScreen(false)
    }
  }, []);

  if (isLoadingScreen === true) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 50 }}>
        <CircularProgress size={100} />
      </Box>
    )
  }
  else {
    return (
      <>
        {showContributorInfo === true ? (
          <ContributorInfoDialog open={showContributorInfo} onClose={handleContributorInfoClose} user={userInfo}/>
        ) : (null)}

        <Container maxWidth="1350px">
          <ThemeProvider theme={theme}>
            <TableContainer elevation={5} component={Paper} style={{ margin: '20px auto' }}>
              <Table>
                <TableHead height={45} sx={{ overflow: 'auto'}}>
                  <TableRow>
                    <TableCell style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Guid</TableCell>
                    
                    <TableCell>Region
                      <IconButton onClick={() => handleSort('region')} >
                        <SortIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell>Is Confirmed
                      <IconButton onClick={() => handleSort('isConfirmed')} >
                        <SortIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell>Info</TableCell>

                    <TableCell>Logo</TableCell>

                    <TableCell>Date
                      <IconButton onClick={() => handleSort('date')} >
                        <SortIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell>Options</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id} sx={item.isConfirmed === null ? {backgroundColor: theme.palette.confirmed.new} :
                     (item.isConfirmed === true ? { backgroundColor: theme.palette.confirmed.main } :
                      {backgroundColor: theme.palette.confirmed.secondary})}>
                      <TableCell style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.id}</TableCell>
                      
                      <TableCell>{item.region}</TableCell>
                      
                      <TableCell>{showStatus(item.isConfirmed)}</TableCell>

                      <TableCell>
                        <Chip icon={<FaceIcon />} onClick={() => handleContributorInfoClick(item)} label="User info" />
                      </TableCell>
                      
                      <TableCell>
                        <Avatar
                          alt="Logo"
                          src={baseImageUrl + item.contributorExcellence.logo}
                          variant="rounded"
                          sx={{ width: 64, height: 64 }}
                        />
                      </TableCell>
                      
                      <TableCell>{item.timeStamp}</TableCell>
                      
                      <TableCell>
                        {item.isConfirmed ? (
                          <IconButton size="small">
                            <ChatIcon />
                          </IconButton>
                        ) : (
                          <DropdownMenu contributorName={item.contributorExcellence.name}/>
                        )}
                      </TableCell>
                    
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ThemeProvider>  
        </Container>
      </>
    );
  }
};