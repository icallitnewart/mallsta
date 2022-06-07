import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	ul, ol {
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	.hidden {
		position:absolute; top:-9999px; opacity:0; 
	}
`;

export default GlobalStyle;