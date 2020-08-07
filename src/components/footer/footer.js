import React from 'react'
import { Link, useStaticQuery } from 'gatsby'

import Container from '../container/container'

import styles from './footer.module.css'

const socialLinks = [
  {
    name: 'facebook',
    logo:
      'https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/footer/facebook-black.svg',
    url: 'https://www.facebook.com/lucidchart/',
  },
  {
    name: 'twitter',
    logo:
      'https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/footer/twitter-black.svg',
    url: 'https://twitter.com/lucidchart',
  },
  {
    name: 'YouTube',
    logo:
      'https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/footer/youtube-black.svg',
    url: 'https://www.youtube.com/user/lucidchart',
  },
  {
    name: 'linkedIn',
    logo:
      'https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/footer/linkedin-black.svg',
    url: 'https://www.linkedin.com/showcase/lucidchart/',
  },
  {
    name: 'Glassdoor',
    logo:
      'https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/footer/glassdoor-black.svg',
    url:
      'https://www.glassdoor.com/Overview/Working-at-Lucid-Software-EI_IE636868.11,25.htm',
  },
]

const defaultLinks = [
  {
    url: 'http://www.lucidchart.com/privacy',
    text: 'Privacy',
  },
  {
    url: 'http://www.lucidchart.com/legal',
    text: 'Legal',
  },
]

const appLinks = [
  {
    url:
      'https://itunes.apple.com/us/app/lucidchart-flowchart-diagram-visio-viewer/id611543423?mt=8',
    image:
      'https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/footer/app-store-white.svg',
    alt: 'Apple App Store',
  },
  {
    url:
      'https://play.google.com/store/apps/details?id=com.lucidchart.android.chart&amp;hl=en',
    image:
      'https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/footer/google-play.svg',
    alt: 'Google play Store',
  },
]

const Footer = () => {
  const data = useStaticQuery(
    graphql`
      {
        allContentfulFooterMenuSection {
          edges {
            node {
              sectionTitle
              footerLink {
                text
                url
              }
            }
          }
        }
      }
    `
  )

  const {
    allContentfulFooterMenuSection: { edges: sections },
  } = data

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Container>
          <div className={styles.footerLinksWrap}>
            {sections.map(({ node }) => (
              <div className={styles.footerLinkSection}>
                <h4 className={styles.linkSectionTitle}>{node.sectionTitle}</h4>
                {node.footerLink.map((link) => (
                  <a href={link.url} className={styles.footerLink}>
                    {link.text}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className={styles.footerBottom}>
        <Container flex>
          <div className={styles.footerBottomLeft}>
            {defaultLinks.map((link) => (
              <Link key={link.text} to={link.url} className={styles.footerLink}>
                {link.text}
              </Link>
            ))}
          </div>
          <div className={styles.footerBottomRight}>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a href={social.url}>
                  <img
                    src={social.logo}
                    alt={social.name}
                    className={styles.socialImg}
                  />
                </a>
              ))}
            </div>
            <div className={styles.appLinkWrap}>
              {appLinks.map((link) => (
                <a key={link.alt} href={link.url} className={styles.appLink}>
                  <img
                    src={link.image}
                    alt={link.alt}
                    className={styles.appLinkImg}
                  />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
