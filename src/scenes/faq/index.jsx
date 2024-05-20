import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Header title="FAQ" subtitle="Frequently asked questions" />
            <Box sx={{
                '& .MuiAccordion-root': {
                    border: `1.5px solid ${colors.secondary[800]}`,
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: colors.background[900],
                        '& .MuiTypography-root': {
                            fontWeight: 'bold',
                        },
                    },
                    '& .MuiAccordionDetails-root': {
                        backgroundColor: colors.secondary[900],
                    },
                },
            }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>What is DebrisX?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>DebrisX is a space debris tracking and monitoring system.</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>What are the benefits of cleaning a reservoir?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>DebrisX is a space debris tracking and monitoring system.</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>How does DebrisX work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>DebrisX is a space debris tracking and monitoring system.</Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}

export default FAQ;