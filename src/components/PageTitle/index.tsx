import { FC } from 'react';
import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid } from '@mui/material';

interface PageTitleProps {
    heading?: string;
    subHeading?: string;
    docs?: string;
}

const PageTitle: FC<PageTitleProps> = ({
    heading = '',
    subHeading = '',
    docs = '',
    ...rest
}) => {
    return (
        <Grid container justifyContent="space-between" alignItems="center" {...rest}>
            <Grid item>
                <Typography variant="h5" gutterBottom sx={{ py: 0.6 }}>
                    {heading}
                </Typography>
                {
                    subHeading && subHeading.length > 0 &&
                    <Typography variant="subtitle2">
                        {subHeading}
                    </Typography>
                }
            </Grid>
            {
                docs && docs.length > 0 &&
                <Grid item>
                    <Button
                        href={docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: { xs: 2, md: 0 } }}
                        variant="contained"
                        startIcon={<AddTwoToneIcon fontSize="small" />}
                    >
                        {heading} Documentation
                    </Button>
                </Grid>
            }

        </Grid>
    );
};

PageTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    docs: PropTypes.string,
};

export default PageTitle;
