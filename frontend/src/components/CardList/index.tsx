import React, { useState } from 'react';
import { Card, CardContent, CardActionArea, Typography, Grid, Avatar, Stack, Pagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './style.scss';

interface CardListProps {
  data: any[];
}

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getAbbreviation = (str: string) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

const CardList: React.FC<CardListProps> = ({ data }) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (!data || data.length === 0) {
    return <Typography variant="h6" color="textSecondary">No items. Please upload the CSV.</Typography>;
  }

  return (
    <div>
      <Grid container spacing={2} className="cards-container">
        {paginatedData.map((row, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }} className="card" data-testid="card">
              <CardActionArea>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
                    {getAbbreviation(row.name || Object.values(row)[0])}
                  </Avatar>
                </Stack>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {toTitleCase(row.name || Object.values(row)[0])}
                  </Typography>
                  {Object.entries(row).map(([key, value]) => (
                    <Typography key={key} variant="body2" color="text.secondary">
                      <span style={{ fontWeight: 'bold' }}>{`${toTitleCase(key)}:`}</span> {` ${String(value)}`} {/* Exibição dos atributos */}
                    </Typography>
                  ))}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default CardList;