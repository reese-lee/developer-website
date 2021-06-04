import React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';
import DevSiteSeo from '../components/DevSiteSeo';
import PropTypes from 'prop-types';
import PageLayout from '../components/PageLayout';
import Tabs from '../components/Tabs';
import noImagePlaceholder from '../images/no-image-placeholder.png';
import { Layout, PageTools, Button } from '@newrelic/gatsby-theme-newrelic';

const ObservabilityPackDetails = ({ data, location }) => {
  const pack = data.observabilityPacks;

  return (
    <>
      <DevSiteSeo title={pack.name} location={location} />
      <Tabs>
        <PageLayout type={PageLayout.TYPE.RELATED_CONTENT}>
          <PageLayout.Header
            title={pack.name}
            css={css`
              border-bottom: none;
            `}
          >
            <Button variant={Button.VARIANT.PRIMARY} size={Button.SIZE.MEDIUM}>
              Install
            </Button>
            <Tabs.Bar
              css={css`
                margin-top: 1rem;
              `}
            >
              <Tabs.BarItem id="overview">Overview</Tabs.BarItem>
              <Tabs.BarItem id="dependencies">Dependencies</Tabs.BarItem>
              <Tabs.BarItem
                id="dashboards"
                disabled={!(pack.dashboards?.length ?? 0)}
                count={pack.dashboards?.length ?? 0}
              >
                Dashboards
              </Tabs.BarItem>
              <Tabs.BarItem
                id="alerts"
                disabled={!(pack.alerts?.length ?? 0)}
                count={pack.alerts?.length ?? 0}
              >
                Alerts
              </Tabs.BarItem>
              <Tabs.BarItem
                id="synthetics"
                disabled={!(pack.synthetics?.length ?? 0)}
                count={pack.synthetics?.length ?? 0}
              >
                Synthetics checks
              </Tabs.BarItem>
              <Tabs.BarItem
                id="visualizations"
                disabled={!(pack.visualizations?.length ?? 0)}
                count={pack.visualizations?.length ?? 0}
              >
                Visualizations
              </Tabs.BarItem>
              <Tabs.BarItem
                id="nerdpacks"
                disabled={!(pack.nerdpacks?.length ?? 0)}
                count={pack.nerdpacks?.length ?? 0}
              >
                Nerdpacks
              </Tabs.BarItem>
            </Tabs.Bar>
          </PageLayout.Header>

          <Layout.Content>
            {/* carousel component if we decide to use multiple images */}
            <Tabs.Pages>
              <Tabs.Page id="overview">
                <img
                  src={noImagePlaceholder}
                  alt="placeholder"
                  height="250px"
                />
                <h3>Description</h3>
                <p>{pack.description}</p>
              </Tabs.Page>
              <Tabs.Page id="dashboards">
                {pack.dashboards?.map((dashboard) => (
                  <>
                    <h3>{dashboard.name}</h3>
                    {dashboard.screenshots?.map((screenshot, index) => (
                      <img
                        key={index}
                        alt="dashboard example"
                        src={screenshot}
                        css={css`
                          height: 200px;
                          margin: 1rem;
                        `}
                      />
                    ))}
                    {dashboard.description && (
                      <>
                        <h4>Description</h4>
                        <p>{dashboard.description}</p>
                      </>
                    )}
                  </>
                ))}
              </Tabs.Page>
              <Tabs.Page id="alerts">
                {pack.alerts?.map((alert) => (
                  <>
                    <h3>{alert.name}</h3>
                    {alert.description && (
                      <>
                        <h4>Description</h4>
                        <p>{alert.description}</p>
                      </>
                    )}
                  </>
                ))}
              </Tabs.Page>
            </Tabs.Pages>
          </Layout.Content>
          <Layout.PageTools
            css={css`
              p,
              li {
                font-size: 0.85rem;
              }
            `}
          >
            <PageTools.Section>
              <PageTools.Title>How to use this pack</PageTools.Title>
              <ol>
                <li>
                  Sign up for a free New Relic account (or log in to your
                  existing account)
                </li>
                <li>Click the green install button above</li>
                <li>
                  Follow the instructions to install the necessary
                  instrumentation to get the data used in this pack
                </li>
                <li>
                  Enjoy the dashboards, alerts, and appications filled with
                  insights on our environment and services.
                </li>
              </ol>
            </PageTools.Section>
            <PageTools.Section>
              <PageTools.Title>Authors</PageTools.Title>
              <p>{pack.authors.join(', ')}</p>
            </PageTools.Section>
          </Layout.PageTools>
        </PageLayout>
      </Tabs>
    </>
  );
};

ObservabilityPackDetails.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query($id: String!) {
    observabilityPacks(id: { eq: $id }) {
      name
      website
      logo
      level
      id
      icon
      description
      alerts {
        name
        definition
        url
      }
      dashboards {
        description
        name
        screenshots
        url
      }
      authors
    }
  }
`;

export default ObservabilityPackDetails;