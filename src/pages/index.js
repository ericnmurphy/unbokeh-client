import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import Layout from '../components/layout'

const MasonryItem = styled.div`
  position: relative;
`

const MasonryAttribution = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`

const Footer = styled.footer`
  text-align: center;
  margin: 5rem 0 3rem;

  span {
    color: #bb6f6b;
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry
      breakpointCols={{ default: 3, 990: 2, 770: 1 }}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {data.allMetadataJson.edges.map(({ node }) => (
        <a href={node.path.publicURL} download>
          <MasonryItem>
            <MasonryAttribution className="masonry-attribution">
              <h6>
                by{' '}
                <a target="_blank" href={node.attrUrl}>
                  {node.author}
                </a>{' '}
                on{' '}
                <a
                  target="_blank"
                  href="https://unsplash.com/?utm_source=unbokeh&utm_medium=referral"
                >
                  Unsplash
                </a>
              </h6>
            </MasonryAttribution>

            <Img fluid={node.path.childImageSharp.fluid} />
          </MasonryItem>
        </a>
      ))}
    </Masonry>
    <Footer>
      Made with <span>♥</span> by{' '}
      <a target="_blank" href="https://ericnmurphy.com/">
        Eric Murphy
      </a>
      .
    </Footer>
  </Layout>
)

export default IndexPage

export const indexQuery = graphql`
  query {
    allMetadataJson {
      edges {
        node {
          author
          attrUrl
          path {
            publicURL
            childImageSharp {
              fluid(maxWidth: 415, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
