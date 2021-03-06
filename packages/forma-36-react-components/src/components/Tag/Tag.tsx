import React, { Component } from 'react';
import cn from 'classnames';

import styles from './Tag.css';

export type TagType =
  | 'primary'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'secondary'
  | 'muted';

type Status = 'published' | 'draft' | 'archived' | 'changed';

const statusTagTypeMap = {
  published: 'positive',
  draft: 'warning',
  archived: 'negative',
  changed: 'primary',
};

export type TagProps = {
  tagType?: TagType;
  style?: React.CSSProperties;
  className?: string;
  testId?: string;
  children: React.ReactNode;
  entityStatusType?: Status;
} & typeof defaultProps;

const defaultProps = {
  tagType: 'primary' as TagType,
  testId: 'cf-ui-tag',
};

export class Tag extends Component<TagProps> {
  static defaultProps = defaultProps;

  render() {
    const {
      className,
      children,
      tagType,
      entityStatusType,
      testId,
      ...otherProps
    } = this.props;

    const classNames = cn(styles.Tag, className, {
      [styles[
        `Tag--${
          entityStatusType
            ? statusTagTypeMap[entityStatusType as Status]
            : tagType
        }`
      ]]: entityStatusType
        ? statusTagTypeMap[entityStatusType as Status]
        : tagType,
    });

    return (
      <div className={classNames} data-test-id={testId} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default Tag;
