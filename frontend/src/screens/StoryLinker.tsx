import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionLoading } from '../components/util';
import { useEffect } from 'react';
import { useFetchStoryPairsQuery } from '../services/stories';

export default function StoryLinker() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const pairsParams = { linked: false, limit: 1 };
  const pairsQuery = { storyId, params: pairsParams };
  const { data, isLoading } = useFetchStoryPairsQuery(pairsQuery, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (data !== undefined && !isLoading) {
      if (data.results.length > 0) {
        const pair = data.results[0];
        navigate(queryString.stringifyUrl({
          'url': `/linker`,
          'query': { anchor: pair.left.id, other: pair.right.id, story: storyId }
        }), { replace: true });
      } else {
        navigate(`/stories/${storyId}`, { replace: true });
      }
    }
  });
  return <SectionLoading />;
}