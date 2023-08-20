import React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

import './Header.css';
import LeftHeaderControls from './LeftHeaderControls';
import MiddleHeaderLogo from './MiddleHeaderLogo';
import RightHeaderControls from './RightHeaderControls';

const Header = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar>

            <LeftHeaderControls />
            <MiddleHeaderLogo />
            <RightHeaderControls />

            {/* TODO Add breadcrumb */}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}


export default Header;


//   const breadcrumbs = location.pathname.split('/').filter((path) => path !== '');
//   const showBreadcrumb = breadcrumbs.length > 0 && breadcrumbs[0] !== 'home';

//   const capitalizeFirstLetter = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//       {showBreadcrumb && (
//         <Box sx={{ flexGrow: 1, backgroundColor: 'lightgray', pb: 1, p: 3, mt: checkUserRole('Admin') || checkUserRole('Manager') ? 0 : 6  }}>
//           <Container fixed>
//             <Toolbar>
//               <Link to="/home" style={{ textDecoration: 'none' }}>
//                 <Typography variant='body1' sx={{ color: 'black', marginRight: '16px' }}>
//                   Home
//                 </Typography>
//               </Link>

//               {breadcrumbs.map((path, index) => (
//                 <React.Fragment key={index}>
//                   <Typography variant='body1' sx={{ color: 'black', marginRight: '16px' }}>
//                     &gt;
//                   </Typography>
//                   <Link to={`/${path}`} style={{ textDecoration: 'none' }}>
//                     <Typography variant='body1' sx={{ color: 'black', marginRight: '16px' }}>
//                       {capitalizeFirstLetter(path)}
//                     </Typography>
//                   </Link>
//                 </React.Fragment>
//               ))}
//             </Toolbar>
//           </Container>
//         </Box>
//       )}
//     </>
//   );
// };
