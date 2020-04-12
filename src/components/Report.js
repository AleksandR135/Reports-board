import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import s from './report.css'

const Report = ({
  title,
  author,
  level,
  language
}) => (
  <Grid item classes={{ root: s.card }} >
    <Card>
      <CardContent>
        <Typography variant='subtitle2' paragraph>{title}</Typography>
        <Typography paragraph>{author}</Typography>
        <Typography>{level.toUpperCase()} / {language}</Typography>
      </CardContent>
    </Card>
  </Grid>    
)

export default React.memo(Report)