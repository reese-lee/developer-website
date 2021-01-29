import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownContainer, MDX } from '@newrelic/gatsby-theme-newrelic';

import Intro from './Intro';
import Iframe from './Iframe';
import Tutorial from './Tutorial';
import TutorialStep from './TutorialStep';
import TutorialSection from './TutorialSection';
import Project from './Project';

const components = {
  // Remove these when all step/steps components have been updated to the new
  // name
  Step: TutorialStep,
  Steps: TutorialSection,
  Project,
  Tutorial,
  TutorialStep,
  TutorialSection,
  Intro,
  iframe: Iframe,
};

const MDXContainer = ({ className, children }) => {
  return (
    <MarkdownContainer className={className}>
      <MDX body={children} components={components} />
    </MarkdownContainer>
  );
};

MDXContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default MDXContainer;
