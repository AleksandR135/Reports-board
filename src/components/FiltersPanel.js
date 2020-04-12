import React from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from './Checkbox'
import s from './filtersPanel.css'

const FiltersPanel = ({
	languageOptions,
	levelOptions,
	handleLanguageFilterChange,
	handleLevelFilterChange,
	handleTextFilterChange,
	handleResetButtonClick,
}) => (
	<div>
		<FormGroup classes={{ root: s.formGroup }} row>
			{languageOptions.map((lang) => <Checkbox key={lang} label={lang} handleFilterChange={(_, value) => handleLanguageFilterChange(lang, value)} />)}
			{levelOptions.map(level => <Checkbox key={level} label={level} handleFilterChange={(_, value) => handleLevelFilterChange(level, value)} />)}
			<TextField
				classes={{ root: s.inputSearch }}
				variant='outlined'
				label='search'
				size='small'
				onChange={handleTextFilterChange}
			/>
			<Button
				variant="contained"
				color='secondary'
				size='small'
				onClick={handleResetButtonClick}
			>
				Reset filter
			</Button>
		</FormGroup>
	</div>
)


export default React.memo(FiltersPanel)