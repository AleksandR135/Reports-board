import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Grid from '@material-ui/core/Grid';
import Report from './Report'
import FiltersPanel from './FiltersPanel'
import request from '../mocked-service'
import { getNewFilterState, getOptions } from '../utils'
import s from './app.css'

const App = () => {
  const [reportList, setReportList] = useState([])
  const [languageFilter, setLanguageFilter] = useState([])
  const [levelFilter, setLevelFilter] = useState([])
  const [textFilter, setTextFilter] = useState('')
  const [resetingFilterKey, setResetingFilterKey] = useState(0)

  useEffect(() => {
    request('/reports').then(setReportList)
  }, [])

  const handleLanguageFilterChange = useCallback((name, isChecked) => {
    let newState = getNewFilterState(languageFilter, name, isChecked)

    if (newState) {
      setLanguageFilter(newState)
    }
  }, [languageFilter])

  const handleLevelFilterChange = useCallback((name, isChecked) => {
    let newState = getNewFilterState(levelFilter, name, isChecked)

    if (newState) {
      setLevelFilter(newState)
    }
  }, [levelFilter])

  const handleTextFilterChange = useCallback(e => {
    setTextFilter(e.target.value.trim())
  }, [])

  const handleResetButtonClick = useCallback(() => {
    setTextFilter('')
    setLanguageFilter([])
    setLevelFilter([])
    setResetingFilterKey(resetingFilterKey + 1)
  }, [resetingFilterKey])

  const languageOptions = useMemo(() => {
    return getOptions(reportList, 'language')
  }, [reportList])

  const levelOptions = useMemo(() => {
    return getOptions(reportList, 'level')
  }, [reportList])

  const filteredReports = useMemo(() => {
    const hasLanguageFilter = Boolean(languageFilter.length)
    const hasLevelFilter = Boolean(levelFilter.length)
    const hasTextFilter = Boolean(textFilter)

    if (!hasLanguageFilter && !hasLevelFilter && !hasTextFilter) {
      return reportList
    }

    let filteredList = reportList

    if (hasLanguageFilter) {
      filteredList = filteredList.filter(({language}) => languageFilter.includes(language))
    }

    if (hasLevelFilter) {
      filteredList = filteredList.filter(({level}) => levelFilter.includes(level))
    }

    if (hasTextFilter) {
      const re = new RegExp(textFilter, 'i') 

      filteredList = filteredList.filter(({title, author}) => {
        return re.test(title) || re.test(author)
      })
    }

    return filteredList
  }, [languageFilter, levelFilter, textFilter, reportList])

  return <main className={s.main}>
    <FiltersPanel
      key={resetingFilterKey}
      languageOptions={languageOptions}
      levelOptions={levelOptions}
      handleLanguageFilterChange={handleLanguageFilterChange}
      handleLevelFilterChange={handleLevelFilterChange}
      handleTextFilterChange={handleTextFilterChange}
      handleResetButtonClick={handleResetButtonClick}
    />
    <Grid container spacing={3} justify='center' classes={{ root: s.reportsWrapper }}>
      {filteredReports.map(report => (
        <Report
          key={report.id}
          title={report.title}
          author={report.author}
          level={report.level}
          language={report.language}
        />
      ))}
    </Grid>
  </main>
}

export default App