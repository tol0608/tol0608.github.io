import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import useThemeToggle from '../hooks/useThemeToggle'
import CategoryList from 'components/Main/CategoryList'
import Introduction from 'components/Main/Introduction'
import PostList from 'components/Main/PostList'
import { PostListItemType } from 'types/PostItem.types'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import queryString, { ParsedQuery } from 'query-string'
import Template from 'components/Common/Template'
import ThemeToggle from 'hooks/themeToggle'
import TopButton from 'hooks/topButton'

import '../styles/themeMode.css'

type CategoryListProps = {
  selectedCategory: string
  categoryList: Record<string, number>
}

type PostType = {
  node: {
    frontmatter: {
      categories: string[]
    }
  }
}

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}) {
  const { theme, toggleTheme } = useThemeToggle()

  const parsed: ParsedQuery = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = edges.reduce(
    (
      list: CategoryListProps['categoryList'],
      {
        node: {
          frontmatter: { categories },
        },
      }: PostType,
    ) => {
      categories.forEach(category => {
        if (list[category] === undefined) list[category] = 1
        else list[category]++
      })

      list['All']++

      return list
    },
    { All: 0 },
  )

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
      <TopButton />
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: ASC } }]
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`
