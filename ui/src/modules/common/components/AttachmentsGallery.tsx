import { __, confirm } from 'modules/common/utils';
import React, { useState } from 'react'
import styled from 'styled-components';
import { rgba } from '../styles/color';
import colors from '../styles/colors';
import { IAttachment } from '../types';
import Attachment from './Attachment';

const List = styled.div`
  margin: 10px 0;
`;

const Item = styled.div`
  margin-bottom: 10px;
`;

const Delete = styled.span`
  text-decoration: underline;
  transition: all 0.3s ease;
  color: ${colors.colorCoreGray};

  &:hover {
    color: ${colors.colorCoreBlack};
    cursor: pointer;
  }
`;

const ToggleButton = styled(Delete.withComponent('div'))`
  padding: 7px 15px;
  border-radius: 4px;
  margin-bottom: 15px;

  &:hover {
    background: ${rgba(colors.colorCoreDarkBlue, 0.07)};
  }
`;

type Props = {
	attachments: IAttachment[];
	onChange: (attachments: IAttachment[]) => void;
	limit?: number;
};

export default (props: Props) => {
	const [hideOthers, toggleHide] = useState(true);

	const removeAttachment = (index: number) => {
		const updatedAttachments  = props.attachments.splice(index, 1)

  	props.onChange(updatedAttachments);
  };

  const toggleAttachments = () => {
    toggleHide(!hideOthers);
	};
	
	const renderItem = (item: IAttachment, index: number) => {
    const onRemove = () => {
			confirm().then(() => removeAttachment(index));
		};
	
		const remove = <Delete onClick={onRemove}>{__('Delete')}</Delete>;

    return (
      <Item key={item.url}>
        <Attachment attachment={item} additionalItem={remove} />
      </Item>
    );
  };

  const renderToggleButton = (hiddenCount: number) => {
    if (hiddenCount > 0) {
      const buttonText = hideOthers
        ? `${__('View all attachments')} (${hiddenCount} ${__('hidden')})`
        : `${__('Show fewer attachments')}`;

      return (
        <ToggleButton onClick={toggleAttachments}>
          {buttonText}
        </ToggleButton>
      );
    }

    return null;
	};
	
	const { limit = 4 } = props;
	const length = props.attachments.length;

	return (
		<>
			<List>
				{props.attachments
					.slice(0, limit && hideOthers ? limit : length)
					.map((item, index) => renderItem(item, index))}
			</List>
			{renderToggleButton(length - limit)}
		</>
	)
}