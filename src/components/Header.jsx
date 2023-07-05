import { React, useContext, useState } from "react";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Fab from "@mui/material/Fab";
import { Themecontext } from "./App";

function Header() {
	const { theme, toggleTheme } = useContext(Themecontext);
	const [bg,setBg] = useState("#f5ba13");
	const fabStyle = 
	{
		color: theme ? "black" : "white",
		boxShadow: "none",
		backgroundColor: bg
	};
	return (
		<header
			style={{
				boxShadow: theme
					? "0 1px 5px rgb(138, 137, 137)"
					: "0 0 10px 5px rgba(255, 255, 255, 0.1)"
			}}
		>
			<h1 style={{ color: theme ? "black" : "white" }}>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>Notes</div>
					<div>
						<Fab size="small"
							onMouseEnter={()=>setBg("#f7c742")}
							onMouseLeave={()=>setBg("#f5ba13")}
							onClick={toggleTheme}
							style={fabStyle}
							>
							{ theme ? <DarkModeIcon/> : <WbSunnyIcon /> }
						</Fab>
					</div>
				</div>
			</h1>
		</header>
	);
}

export default Header;
