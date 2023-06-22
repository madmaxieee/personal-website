import { Container, Title } from '@mantine/core';

import cppLogo from '@/assets/images/logos/cpp-logo.png';
import cssLogo from '@/assets/images/logos/css-logo.png';
import dockerLogo from '@/assets/images/logos/docker-logo.png';
import gitLogo from '@/assets/images/logos/git-logo.png';
import goLogo from '@/assets/images/logos/go-logo.png';
import htmlLogo from '@/assets/images/logos/html-logo.png';
import javascriptLogo from '@/assets/images/logos/js-logo.png';
import nextLogo from '@/assets/images/logos/next-logo.png';
import nodeLogo from '@/assets/images/logos/node-logo.png';
import pythonLogo from '@/assets/images/logos/python-logo.png';
import pytorchLogo from '@/assets/images/logos/pytorch-logo.png';
import reactLogo from '@/assets/images/logos/react-logo.png';
import tailwindLogo from '@/assets/images/logos/tailwind-logo.png';
import typescriptLogo from '@/assets/images/logos/ts-logo.png';
import Cell from '@/components/SkillCell';

export const SkillsContent = () => {
  return (
    <Container size="xl">
      <Title className="mb-8 text-giant text-white max-md:mb-4 max-md:pt-4 max-md:text-7xl">
        skills
      </Title>
      <Container className="grid grid-cols-5 max-md:grid-cols-3">
        <Cell logo={typescriptLogo} label="typescript" />
        <Cell logo={javascriptLogo} label="javascript" />
        <Cell logo={reactLogo} label="react" />
        <Cell logo={nextLogo} label="next.js" />
        <Cell logo={htmlLogo} label="html" />
        <Cell logo={cssLogo} label="css" />
        <Cell logo={tailwindLogo} label="tailwind" />
        <Cell logo={pythonLogo} label="python" />
        <Cell logo={pytorchLogo} label="PyTorch" />
        <Cell logo={goLogo} label="go" />
        <Cell logo={cppLogo} label="c++" />
        <Cell logo={nodeLogo} label="node.js" />
        <Cell logo={dockerLogo} label="docker" />
        <Cell logo={gitLogo} label="git" />
      </Container>
    </Container>
  );
};

export default SkillsContent;
