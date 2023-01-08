import { HTMLTable } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { useNodeTypes } from "../selectors";
import { useFetchRelatedClusterListingQuery } from "../services/clusters";
import { ICluster } from "../types";
import { getClusterLink } from "../util";
import PairLink from "./PairLink";
import { SectionLoading, ClusterType, ClusterTypeIcon } from "./util";

type RelatedListingProps = {
  cluster: ICluster,
}

export default function RelatedListing({ cluster }: RelatedListingProps) {
  const nodeTypes = useNodeTypes();
  const relatedParams = { clusterId: cluster.id, params: { types: nodeTypes } };
  const { data: listing, isLoading } = useFetchRelatedClusterListingQuery(relatedParams)
  if (listing === undefined || isLoading) {
    return <SectionLoading />
  }

  return (
    <>
      <HTMLTable condensed bordered className="wide">
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th style={{ width: '1%' }} className="numeric">Articles</th>
          </tr>
        </thead>
        <tbody>
          {listing.results.map((related) => (
            <tr key={related.id}>
              <td>
                <ClusterTypeIcon type={cluster.type} size={14} />
                <Link to={getClusterLink(related)}>{related.label}</Link>
              </td>
              <td>
                <PairLink left={cluster} right={related} link_types={related.link_types} />
              </td>
              <td className="numeric">{related.articles}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
      {/* <code>{listing.debug_msg}</code> */}
    </>
  )
}