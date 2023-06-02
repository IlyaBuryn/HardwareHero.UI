import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Avatar, Box, CircularProgress, Container } from '@mui/material';
import { MoreVert as MoreVertIcon, Done as DoneIcon, Cancel as CancelIcon, Chat as ChatIcon } from '@mui/icons-material';
import { checkUserRole } from '../../../services/userManager';
import { getAllContributors } from '../../../services/contributorManager';
import SortIcon from '@mui/icons-material/Sort';

const baseImageUrl = 'http://localhost/images/';


const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirm = () => {

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
        <MenuItem onClick={handleClose}>
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
  const [data, setData] = useState([]);

  useEffect(() => {
    async function tryGetContributors() {
      setIsLoadingScreen(true)
        
        var contributors = await getAllContributors(placeholderHandler);
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


  const placeholderHandler = (str) => { }



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
        main: '#a3b18a',
        secondary: '#e5989b',
        new: '#ede0d4'
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
  

  useEffect(() => {
    setIsLoadingScreen(true)
    if (checkUserRole('Manager') === false) {
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
      <Container fixed>
        <ThemeProvider theme={theme}>
          <TableContainer elevation={5} component={Paper} style={{ margin: '20px auto' }}>
            <Table>
              <TableHead>
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
                  <TableCell>Name
                    <IconButton onClick={() => handleSort('name')} >
                      <SortIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>Email
                    <IconButton onClick={() => handleSort('email')} >
                      <SortIcon />
                    </IconButton>
                  </TableCell>
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
                  <TableRow key={item.id} sx={item.isConfirmed === null ? {backgroundColor: theme.palette.confirmed.new} : (item.isConfirmed === true ? { backgroundColor: theme.palette.confirmed.main } : {backgroundColor: theme.palette.confirmed.secondary})}>
                    <TableCell style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.id}</TableCell>
                    <TableCell>{item.region}</TableCell>
                    <TableCell>{showStatus(item.isConfirmed)}</TableCell>
                    <TableCell>{item.contributorExcellence.name}</TableCell>
                    {/* Should be Email */}
                    <TableCell style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.userId}</TableCell>
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
                        <DropdownMenu />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>  
      </Container>
    );
  }
};