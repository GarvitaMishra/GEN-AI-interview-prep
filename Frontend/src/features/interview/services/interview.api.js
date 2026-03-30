import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

export default api;

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async (data) => {
  const formData = new FormData()

  if (data.resume) {
    formData.append("resume", data.resume)
  }

  if (data.jobDescription) {
    formData.append("jobDescription", data.jobDescription)
  }

  if (data.selfDescription) {
    formData.append("selfDescription", data.selfDescription)
  }

  const response = await api.post("/api/interview/", formData, {
    withCredentials: true
  })

  return response.data
}

/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`,{
        withCredentials: true
    })

    return response.data
}


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/",{
        withCredentials: true
    })

    return response.data
}


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob",
        withCredentials: true
    })

    return response.data
}