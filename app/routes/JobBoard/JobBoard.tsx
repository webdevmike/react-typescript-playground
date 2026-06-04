import { useState, useEffect } from "react";

const PAGE_SIZE = 6;

type JobIds = number[];

type JobDetails = {
  id: number;
  by: string;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const fetchData = async <T,>(url: string, signal: AbortSignal): Promise<T> => {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("response not ok");
  }
  const result = await response.json();
  return result;
};

export default function JobBoard() {
  const [jobIds, setJobIds] = useState<JobIds>([]);
  const [jobDetails, setJobDetails] = useState<JobDetails[]>([]);
  const [loadingJobDetails, setLoadingJobDetails] = useState(false);
  const [page, setPage] = useState(1);

  const showLoadMore = PAGE_SIZE * page <= jobIds.length;

  useEffect(() => {
    const controller = new AbortController();
    const fetchJobIds = async () => {
      try {
        const allJobIds = await fetchData<JobIds>(
          "https://hacker-news.firebaseio.com/v0/jobstories.json",
          controller.signal,
        );
        setJobIds(allJobIds);
      } catch (e) {
        // In a real app, we would handle the error
      }
    };
    fetchJobIds();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchJobDetails = async () => {
      if (jobIds.length === 0) return;

      try {
        setLoadingJobDetails(true);
        const start = PAGE_SIZE * (page - 1);
        const end = PAGE_SIZE + start;

        const jobDetailIds = jobIds.slice(start, end);

        const jobDetailPromises = jobDetailIds.map((jobId) =>
          fetchData<JobDetails>(
            `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
            controller.signal,
          ),
        );

        const result = await Promise.all(jobDetailPromises);
        setJobDetails((prev) => [...prev, ...result]);
      } catch (e) {
        // In a real app, we would handle the error
      } finally {
        setLoadingJobDetails(false);
      }
    };
    fetchJobDetails();
    return () => controller.abort();
  }, [page, jobIds]);

  if (jobDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ol>
        {jobDetails.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ol>
      {showLoadMore && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loadingJobDetails}
        >
          {loadingJobDetails ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
